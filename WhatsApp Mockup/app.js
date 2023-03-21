console.log(Date.now());

//stage is wa-msg
const stage = document.getElementById("wa-msg");

//print function
function print() {
    html2canvas(stage, {scale: 2}).then(function(canvas) {
        const downloadLink = document.createElement("a");
        downloadLink.href = canvas.toDataURL("image/png");
        downloadLink.download = "myDiv.png";
        downloadLink.click();
      });
}
// display toggle
function toggle(e) {
  switch (e[0].name) {

    case 'elink':
    case 'clink': {
      console.log("i ran")
      e[0].value.length == 0 ? e[2].style.display = "none" : e[2].style.display = "flex";

      elem.clink[0].value.length == 0 && elem.elink[0].value.length == 0 ? elem.ldivider.style.display = "none" : elem.ldivider.style.display = "block";
      break;
    }

    default : {
      e[0].value.length == 0 ? e[1].style.display = "none" : e[1].style.display = "block";
      break;
    }
  }
}
// format text
function formatText(input) {
  let output = input.replace(/\*(.*?)\*/g, "<b>$1</b>");
  output = output.replace(/_(.*?)_/g, "<i>$1</i>");
  output = output.replace(/~(.*?)~/g, "<strike>$1</strike>");
  output = output.replace(/\n/g, "<br>");
  return output;
}

// mapping elements and inputs

const elem = {
  logo : [document.querySelector('[name = "logo"]'), document.getElementById('logo')],
  cname : [document.querySelector('[name = "cname"]'), document.getElementById('cname')],
  media : [document.querySelector('[name = "media"]'), document.getElementById('msg-img-input'), document.querySelector('.msg-img-container'), document.querySelector('.vid-ico'), document.querySelector('[name = "msgimg"]'), document.getElementById('msgimg')],
  msg : [document.querySelector('[name = "msg"]'), document.getElementById('msg')],
  clink : [document.querySelector('[name = "clink"]'), document.getElementById('clink'), document.querySelector('.call-link-container')],
  elink : [document.querySelector('[name = "elink"]'), document.getElementById('elink'),  document.querySelector('.external-link-container')],
  ldivider : document.getElementById('linkdivider'),
  qr1 : [document.querySelector('[name = "qr1"]'), document.getElementById('qr1')],
  qr2 : [document.querySelector('[name = "qr2"]'), document.getElementById('qr2')],
  qr3 : [document.querySelector('[name = "qr3"]'), document.getElementById('qr3')]
}

function firstRun() {
  // adding event listeners to inputs
  for(let e in elem) {
    switch (e) {
      case 'ldivider' : {
        break;
      }
      case 'logo' : {
        elem[e][0].addEventListener("change", (t) => {
          let reader = new FileReader();
          reader.onload = (r) => {
            elem[e][1].src = r.target.result;
          }
          reader.readAsDataURL(t.target.files[0]);
        });
        break;
      }
      case 'media' : {
        elem[e][0].addEventListener("change", (t) => {
          if(t.target.value == "nomedia") {
            elem[e][1].style.display = "none";
            elem[e][2].style.display = "none";
          } else {
            elem[e][1].style.display = "block";
            elem[e][2].style.display = "block";
            t.target.value == "video" ? elem[e][3].style.display = "block" : elem[e][3].style.display = "none";
          }

          elem[e][4].addEventListener("change", (s) => {
            let reader = new FileReader();
            reader.onload = (r) => {
              elem[e][5].src = r.target.result;
            }
            reader.readAsDataURL(s.target.files[0]);
          });
        });
        break;
      }
      case 'msg': {
        elem[e][0].addEventListener("keyup", (t) => {elem[e][1].innerHTML = formatText(t.target.value); toggle(elem[e])});
        toggle(elem[e]);
        break;
      }
      default : {
        elem[e][0].addEventListener("keyup", (t) => {elem[e][1].innerText = t.target.value; toggle(elem[e])});
        toggle(elem[e]);
        break;
      }
    }

    // if (e == "ldivider" || e == "logo") {continue;}
    // elem[e][0].addEventListener("keyup", (t) => {elem[e][1].innerText = t.target.value; toggle(elem[e])});
    // toggle(elem[e]);
  }
}
firstRun();