use starknet::ContractAddress;

// Player model
#[derive(Drop, Copy, Serde)]
#[dojo::model]
pub struct Player {
    #[key]
    pub username: felt252, //username
    pub owner: ContractAddress, // account owner of
    pub total_games_played: u256,
    pub total_games_won: u256,
    pub total_earnings: u256,
    pub total_spent: u256,
}

pub trait PlayerTrait {
    fn new(username: felt252, owner: ContractAddress) -> Player;
}

impl PlayerImpl of PlayerTrait {
    fn new(username: felt252, owner: ContractAddress) -> Player {
        Player {
            username,
            owner,
            total_games_played: 0,
            total_games_won: 0,
            total_earnings: 0,
            total_spent: 0
        }
    }
}