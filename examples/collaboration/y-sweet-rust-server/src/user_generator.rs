use rand::Rng;
use serde::Serialize;

pub const ADJECTIVES: &[&str] = &[
    "Happy", "Clever", "Brave", "Swift", "Bright", "Calm", "Bold", "Quick", 
    "Wise", "Cool", "Kind", "Smart", "Wild", "Free", "Pure", "Strong",
    "Gentle", "Noble", "Fierce", "Sharp", "Sleek", "Vivid", "Zesty"
];

pub const ANIMALS: &[&str] = &[
    "Tiger", "Eagle", "Wolf", "Fox", "Bear", "Lion", "Hawk", "Deer",
    "Owl", "Shark", "Lynx", "Otter", "Raven", "Falcon", "Puma", "Seal",
    "Whale", "Cobra", "Gecko", "Moose", "Bison", "Crane", "Viper"
];

#[derive(Serialize)]
pub struct UserInfo {
    pub name: String,
    pub email: String,
}

pub fn generate_user() -> UserInfo {
    let mut rng = rand::thread_rng();
    let user_id: u32 = rng.gen_range(1000..10000);
    
    let adjective = ADJECTIVES[rng.gen_range(0..ADJECTIVES.len())];
    let animal = ANIMALS[rng.gen_range(0..ANIMALS.len())];
    
    let full_name = format!("{} {}-{}", adjective, animal, user_id);
    let email = format!("{}.{}{}@example.com", adjective.to_lowercase(), animal.to_lowercase(), user_id);
    
    UserInfo {
        name: full_name,
        email,
    }
}
