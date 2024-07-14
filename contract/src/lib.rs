#![no_std]

use gstd::{msg, prelude::*};

// Define a static mutable variable `COUNTER` to store the click count. It is initially uninitialized.
static mut LINK: Option<String> = None;

#[no_mangle]
extern fn init() {
    unsafe {
        LINK = Some(String::from("Foxy"));
    }
}

// The `handle` function processes incoming messages. It expects a message of type `String`.
// If the message is "Click", it increments the `COUNTER` by 1 and replies with "Success".
#[no_mangle]
extern fn handle() {
    // Load the message.
    let new_msg: String = msg::load().expect("Unable to create string");

    // Check if the message is "Click".
    if new_msg == "Click" {
        // Safely access and modify the `COUNTER`.
        let link = unsafe{
            LINK.as_mut().expect("Unexpected uninitialized `LINK`.")
        };
        *link += "a";
        // Send a reply message with "Success".
        msg::reply_bytes("Success", 0).expect("Unable to reply");
    }
}

// The `state` function returns the current state of the `COUNTER`.
#[no_mangle]
extern fn state() {
    // Reply with the current value of `COUNTER`. Clone the value to ensure it is not modified by the `handle` function.
    msg::reply(unsafe { LINK.clone().expect("Unexpected uninitialized `LINK`.") }, 0)
        .expect("Failed to encode or reply with `<HamsterMetadata as Metadata>::State` from `state()`");
}
