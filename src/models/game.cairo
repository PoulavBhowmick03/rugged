use core::num::traits::Zero;
use starknet::{ContractAddress, get_block_timestamp, contract_address_const};

// Represents the status of the game
// Can either be Ongoing or Ended
#[derive(Serde, Copy, Drop, Introspect, PartialEq, Debug)]
pub enum GameStatus {
    Ongoing,
    Waiting,
    Ended,
}

// Game model
// Keeps track of the state of the game
#[derive(Drop, Serde)]
#[dojo::model]
pub struct Game {
    #[key]
    pub game_id: u64,
    pub player: ContractAddress,
    pub game_mode: GameMode,
    bet_amount: u256,
    won: bool,
    completed: bool,
    timestamp: u64
}

pub trait GameTrait {
    // Create and return a new game
    fn new(
        id: u64,
        player: ContractAddress,
        bet_amount: u256
    ) -> Game;
}

impl GameImpl of GameTrait {
    fn new(
        id: u64,
        player: ContractAddress,
        bet_amount: u256
    ) -> Game {
        let zero_address = contract_address_const::<0x0>();
        Game {
            id,
            player,
            bet_amount : 100,
        }
    }

}
