import { auth }
from "./firebase.js";

import {
    signOut
}
from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const btn =
document.getElementById(
    "loggutKnapp"
);

if (btn) {

    btn.addEventListener(
        "click",
        async () => {

            await signOut(auth);

            location.reload();

        }
    );

}