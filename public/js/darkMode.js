var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme){
    document.documentElement.setAttribute('data-theme', storedTheme)
}
/**
 * Change page theme
 * 
 * @returns {String} targetTheme
 */
function changeTheme() {
    var currentTheme = document.documentElement.getAttribute("data-theme");
    var targetTheme = "light";

    if (currentTheme === "light") {
        targetTheme = "dark";
        document.getElementById("darkmodeBtn").checked = true
    } else {
        document.getElementById("darkmodeBtn").checked = false
    }

    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme);
    
    return targetTheme;
}