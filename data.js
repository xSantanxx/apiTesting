

async function fetchData() {
    try {
        // e.preventDefault();
        
        const username = document.getElementById('user').value;
        const cals = document.getElementById('cals').value;
        console.log('Sending:', username);
        console.log('Sending:', cals);

        if(isNaN(cals) || cals <= 0){
            alert('Please enter a valid number for calories');
            return;
        }

        const response = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, calories: cals})
        
    });

    if (!response.ok) {
        throw new Error('Server error!');
    }

    const result = await response.json();
    console.log('Server Response:', result);
    alert(result.message);

    } catch (error) {
        console.log(error);
        return;
    }
}