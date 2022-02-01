/*https://careerkarma.com/blog/javascript-queryselector-vs-getelementbyid/
consider using getElementById/getElementsByClassName
*/

const loginForm = document.querySelector(".loginForm .loginFormEach");
const loginBtn = document.querySelector(".loginForm .loginBtnField .loginFormSubmit");
const loginErrorMsg = document.querySelector(".loginErrorMsg");

//activating login button
loginForm.onkeyup = ()=> {
    //users value:
    let userData = loginForm.value;
    if(userData.trim() != 0) { //if user values aren't only spaces
        loginBtn.classList.add("active");/*from inputField button.active*/ 
    } else {
        loginBtn.classList.remove("active");
    }
}

//password visibility
function passwordToogle() {
    var pass = document.getElementById("passwordField");
    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  }


//addBtn.onclick = ()=> {
    //e represents the click of the button
loginBtn.addEventListener("click", (e) => {
    e.preventDefault(); //preventing submitting the form
    //validating data
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "user" && password === "web_dev") {
        alert("You have successfully logged in.");
        location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})