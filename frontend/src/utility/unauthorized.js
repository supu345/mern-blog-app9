export default function unauthorized(code){
    if(code===401){
        sessionStorage.clear();
        localStorage.clear();
        window.location.href="/login"
    }
}