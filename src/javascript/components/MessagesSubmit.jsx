import React from 'react';
import axios from 'axios';


const handleMessageSend = async (e) => {

    const senderName = document.getElementById('senderName').value;
    const receiverMail = document.getElementById('receiverMail').value;
    const messageContent = document.getElementById('messageContent').value;

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/messages/send`,
            {

                senderName,
                receiverMail,
                messageContent,
                senderMail: 'edith.dragoi@gmail.com'
            }
        )

        console.log(response)

        if (response) {
            alert(`\nE-mail sent`)
        }
    }
    catch (error) {
        console.log(error);
    }
}

function MessagesSubmit() {
    return (
        <div id="MessagesSubmit">
            <h2 className='text-2xl font-bold mb-4'>Send an e-mail</h2>
            <form>
                <label className="block uppercase text-gray-700 text-xs font-bold mb-2" >
                    Your name
                </label>
                <input className="block w-full bg-white text-gray-700 rounded py-3 px-4 mb-3 " id="senderName" type="text" placeholder="Your name here" />

                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="receiverMail">
                    Receiver mail
                </label>
                <input className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="receiverMail" type="text" placeholder="Who do you want to send it to?" />
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="messageContent">
                    Your message
                </label>
                <textarea
                    rows={4}
                    name="comment"
                    id="messageContent"
                    className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-800 rounded-md p-5"
                    placeholder={'Say hello!'} />
            </form>


            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 capitalize'
                onClick={handleMessageSend}
            >
                Send
            </button>


        </div>
    );
}

export default MessagesSubmit;