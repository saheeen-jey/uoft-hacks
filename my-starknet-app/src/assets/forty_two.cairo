use starknet::ContractAddress;
use starknet::contract_address::contract_address_const;
use starknet::get_block_info;

#[starknet::interface]
trait ITimeCapsule<TContractState> {
    fn get_loc(self: @TContractState, time: u128) -> u128;
    fn get_key(self: @TContractState, time : u128) -> u64;
    fn maxTime(self: @TContractState) -> u128;
    fn setUp(ref self: TContractState, loc: u128, newKey:u64, added_time: u128, time: u128);
}

#[starknet::contract]
mod TimeCapsule {
    use starknet::ContractAddress;
    use starknet::get_block_info;
    use starknet::info::get_block_number;
    use starknet::info;
    #[storage]
    struct Storage {
        key: u64,
        loc: u128,
        release_time: u128,
    }
    #[constructor]
    fn constructor(ref self: ContractState, loc: u128, newKey:u64, added_time: u128, time: u128) {
        self.key.write(newKey);
        self.loc.write(loc);
        let timeStamp = time;
        let totalTime = timeStamp + added_time;
        self.release_time.write(totalTime);
    }

    #[abi(embed_v0)]
    impl TimeCapsule of super::ITimeCapsule<ContractState> {
         fn get_loc(self: @ContractState, time: u128) -> u128 {
            let timeStamp = time;
            if timeStamp > self.release_time.read() {
                return self.loc.read();
            }
            return 0;
        }
        fn get_key(self: @ContractState, time: u128) -> u64 {
            let timeStamp = time;
            if timeStamp > self.release_time.read() {
                return self.key.read();
            }
            return 0;
        }
        fn maxTime(self: @ContractState) -> u128 {
            return self.release_time.read();
        }
        fn setUp(ref self: ContractState, loc: u128, newKey:u64, added_time: u128, time: u128){
            if loc!= 0 {
                self.key.write(newKey);
                self.loc.write(loc);
                let timeStamp = time;
                let totalTime = timeStamp + added_time;
                self.release_time.write(totalTime);
            }
        }
    }
}