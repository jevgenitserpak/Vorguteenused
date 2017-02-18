/**
 * Created by Jeff on 18/02/2017.
 */
function changeForm() {
    document.getElementById("loginForm").style.display = 'none';
    document.getElementById("registerForm").style.display = 'block';
}

function changeToLogin() {
    document.getElementById("loginForm").style.display = 'block';
    document.getElementById("registerForm").style.display = 'none';
}