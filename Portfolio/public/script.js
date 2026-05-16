let links = document.querySelectorAll(".nav-item .nav-link");
links.forEach(link=>{
    link.addEventListener("click",()=>{
        let activeAlready = Array.from(links).find(l=>l.classList.contains("active"));
        console.log(activeAlready);
        activeAlready.classList.remove("active");
        link.classList.add("active");
    });
});

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        name: form[0].value,
        email: form[1].value,
        message: form[2].value
    };

    try {
        const response = await fetch('/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Message sent successfully!');
            form.reset();
        } 
        else {
            alert('Failed to send message.');
        }
    } catch (err) {
        console.error(err);
        alert('Error sending message.');
    }
});

