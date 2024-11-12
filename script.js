let btn = document.querySelector('#btn')
let content= document.querySelector('#content')
let voice = document.querySelector('#voice')


function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch  =1
    text_speak.volume=1
    text_speak.lang = "hi-GB"

    window.speechSynthesis.speak(text_speak)
}

function wishMe(){
    let day = new Date()
    let hours = day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning")
    }
    else if(hours>=12 && hours<16){
        speak("Good Afternoon")
    }
    else{
        speak("Good Evening")
    }  
    }
    window.addEventListener('load', ()=>{
        wishMe()
    })

    let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition
    let recognition = new speechRecognition()
    recognition.onresult = (event) => {
        let currentIndex = event.resultIndex
        let transcript = event.results[currentIndex][0].transcript

        content.innerText = transcript
        takeCommand(transcript.toLowerCase())

        // console.log(event)
    }

    btn.addEventListener("click",()=>{
        recognition.start()
        btn.style.display = "none"
        voice.style.display="block"
    })

    function takeCommand(message){
         btn.style.display = "flex"
         voice.style.display="none"
        if(message.includes("hello")||message.includes("hey")){
            speak("hello, What can i help you?")
        }
        else if(message.includes("tell me about you")){
            speak("I am virtual assistant , created by Sakshi")
        }        
        else if(message.includes("open google")){
            speak("Opening google...")
            window.open("https://www.google.co.in/", "_blank")
        }
        else if(message.includes("open youtube")){
            speak("Opening youtube...")
            window.open("https://www.youtube.com/", "_blank")
        }
        else if(message.includes("open facebook")){
            speak("Opening facebook...")
            window.open("https://www.facebook.com/", "_blank")
        }
        else if(message.includes("open instagram")){
            speak("Opening instagram...")
            window.open("https://www.instagram.com/", "_blank")
        }
        else if(message.includes("open whatsapp")){
            speak("Opening whatsapp...")
            window.open("https://web.whatsapp.com/", "_blank")
        }
        else if(message.includes("open calculator")){
            speak("Opening calculator...")
            window.open("calculator://", "_blank")
        }
        else if(message.includes("open gmail")){
            speak("Opening gmail...")
            window.open("https://mail.google.com/", "_blank")
        }
        else if(message.includes("time")){
           let time= new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric", second:"numeric"})
           speak(time)
        }
        else if(message.includes("date")){
            let date= new Date().toLocaleString(undefined,{day:"numeric",month:"long", year:"numeric"})
            speak(date)
         }
        else{
            let finalText = "this is what i found on internet regarding" + message.replace("chitti")           
            speak(finalText)
            window.open(`https://www.google.com/search?q=${message.replace("chitti")}`)
        }
    }