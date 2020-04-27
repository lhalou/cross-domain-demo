// console.log("这是frank！");
// let request = new XMLHttpRequest();
// request.open("GET", "http://localhost:9991/friends.json");
// request.onreadystatechange = () => {
//   if (request.readyState === 4) {
//     if (request.status >= 200 && request.status < 300) {
//       console.log(request.response);
//     }
//   }
// };
// request.send();
function jsonp(url) {
  return new Promise((resolve, reject) => {
    let random = Math.random();
    window[random] = (data) => {
      resolve(data);
    };
    let script = document.createElement("script");
    script.src = `${url}?callback=${random}`;
    script.onload = () => {
      script.remove();
    };
    script.onerror = () => {
      reject();
    };
    document.body.appendChild(script);
  });
}

jsonp("http://localhost:9991/friends.js").then((data) => {
  console.log(data);
});
