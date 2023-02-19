import {useState, useEffect} from 'react'
import './MessageSection.css'

const MessageSection = () => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch('http://192.168.1.37:8080/getAllMessages')
        .then(data => data.json())
        .then(data => setMessages(data))
    }, [messages]) 
  return (
    <div className="MessageSection">
        {
            messages.map(({userId, name, message}) => 
                <div key={userId}>
                    <p><strong>{name} :</strong> {message}</p>
                </div>
            )
        }
    </div>
  )
}

export default MessageSection