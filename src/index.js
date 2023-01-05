// require("./style.scss")
import "./scss/style.scss" // A enlever en prod

import { camelCase } from "lodash"

console.log(camelCase("hello world"))

window.onload = function () {
	// var str = "hello world"
	// var str2 = document.getElementById("txt")
	// str2.innerHTML = camelCase(str)

	var str = document.getElementById("txt")
	str.innerHTML = camelCase(str.textContent)
}
