

// actions.cairo
#[dojo::contract]
mod actions {
    use super::*;
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    use cartridge_vrf::vrf::{Request, Response, IRandomness};

    const WIN_PROBABILITY: u32 = 30;
    const LORDS_AMOUNT: u256 = 100_000_000_000_000_000_000;

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        GameStarted: GameStarted,
        GameCompleted: GameCompleted,
    }

    #[derive(Drop, starknet::Event)]
    struct GameStarted {
        game_id: u64,
        player: ContractAddress,
        timestamp: u64
    }

    #[derive(Drop, starknet::Event)]
    struct GameCompleted {
        game_id: u64,
        player: ContractAddress,
        won: bool
    }

    #[storage]
    struct Storage {
        game_counter: u64,
        lords_token: IERC20Dispatcher,
        treasury: ContractAddress,
        vrf: IRandomness
    }

    #[external(v0)]
    fn play_game(
        ref self: ContractState,
        commands: Commands,
        world: IWorldDispatcher
    ) -> bool {
        let caller = get_caller_address();
        
        // Transfer LORDS tokens to treasury
        let lords = self.lords_token.read();
        lords.transfer_from(caller, self.treasury.read(), LORDS_AMOUNT);

        // Create new game
        let game_id = self.game_counter.read();
        let game = Game::new(game_id, caller, LORDS_AMOUNT);
        commands.write(game);
        
        // Emit game started event
        emit!(
            world,
            GameStarted {
                game_id,
                player: caller,
                timestamp: get_block_timestamp()
            }
        );

        // Get random number from VRF
        let request = Request {
            caller,
            seed: game_id,
            callback_addr: starknet::get_contract_address(),
            num_words: 1,
        };
        
        let response = self.vrf.read().request_random(request);
        let random_number = response.random_words[0] % 100;
        
        // Determine if player won
        let won = random_number < WIN_PROBABILITY;
        
        // Update game state
        let mut game = commands.read::<Game>(game_id);
        game.won = won;
        game.completed = true;
        commands.write(game);

        // Update player stats
        let mut player = commands.read::<Player>(caller);
        player.total_games_played += 1;
        player.total_spent += LORDS_AMOUNT;
        
        if won {
            player.total_games_won += 1;
        }
        
        commands.write(player);
        
        // Increment game counter
        self.game_counter.write(game_id + 1);
        
        // Emit game completion event
        emit!(
            world,
            GameCompleted {
                game_id,
                player: caller,
                won
            }
        );

        won
    }

    #[external(v0)]
    fn get_player_stats(
        self: @ContractState,
        world: IWorldDispatcher,
        username: felt252
    ) -> Player {
        commands.read::<Player>(username)
    }

    #[external(v0)]
    fn get_game(
        self: @ContractState,
        world: IWorldDispatcher,
        game_id: u64
    ) -> Game {
        commands.read::<Game>(game_id)
    }
}