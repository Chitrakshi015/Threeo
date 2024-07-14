#![no_std]

use gstd::{msg, prelude::*};

#[derive(Default, Debug, Encode, Decode, PartialEq, Eq, PartialOrd, Ord, Clone, TypeInfo, Hash)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
//#[gmeta::metawasm]
pub struct ThreeData {
    pub name: String,
    pub description: String,
}

// Define a static mutable variable `COUNTER` to store the click count. It is initially uninitialized.
static mut THREEO: Option<ThreeData> = None;

#[no_mangle]
extern "C" fn init() {
    let three = ThreeData {
        name: "Three".to_string(),
        description: "Three".to_string(),
    };
    unsafe {
        THREEO = Some(three);
    }
}

// The `handle` function processes incoming messages. It expects a message of type `String`.
// If the message is "Click", it increments the `COUNTER` by 1 and replies with "Success".
#[no_mangle]
extern "C" fn handle() {
    // Load the message.
    //let new_msg: String = msg::load().expect("Unable to create string");
    //
    //// Check if the message is "Click".
    //if new_msg == "Click" {
    //    // Safely access and modify the `COUNTER`.
    //    let link = unsafe{
    //        LINK.as_mut().expect("Unexpected uninitialized `LINK`.")
    //    };
    //    *link += "a";
    //    // Send a reply message with "Success".
    unsafe {
        msg::reply(THREEO.clone(), 0).expect("Unable to reply");
    }
}

// The `state` function returns the current state of the `COUNTER`.
#[no_mangle]
extern "C" fn state() {
    // Reply with the current value of `COUNTER`. Clone the value to ensure it is not modified by the `handle` function.
    let _ = msg::reply(unsafe { THREEO.clone().expect("Yeah an error") }, 0);
}

