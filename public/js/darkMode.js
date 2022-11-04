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
        setMode(targetTheme)
        
    } else {
        setMode(targetTheme)
    }

    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme);
    
    return targetTheme;
}

function setMode(theme) {
    console.log(document.getElementById("darkmodeBtn"));
    if (theme === "dark") {
        document.getElementById("darkmodeBtn").checked = true
        document.getElementById('icon-theme-sun').style.display = 'none'
        document.getElementById('icon-theme-moon').style.display = 'block'
    }
    else {
        document.getElementById("darkmodeBtn").checked = false
        document.getElementById('icon-theme-sun').style.display = 'block'
        document.getElementById('icon-theme-moon').style.display = 'none'
    }
}