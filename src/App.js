import './App.css';
import React, {useState, useEffect} from 'react';
import Quote from './components/quote'

function App() {

  //state to store the current quote
  const [quote, setQuote] = useState({
    text: "Click the button to get a quote!",
    author: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  //function to fetch a new quote
  const fetchQuote = async () => {
    setIsLoading(true);

    console.log('API Key:', process.env.REACT_APP_API_NINJAS_KEY);

    try {
      
      const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
        headers: {
          'X-Api-Key': process.env.REACT_APP_API_NINJAS_KEY
        }
      });
  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      if (!data || !data[0] || !data[0].quote) {
        throw new Error("Invalid data format from API");
      }

      setQuote({
        text: data[0].quote,
        author: data[0].author
      });
    } catch (error){
      console.error(error);
      setQuote({
        text: "Failed to fetch quote. Please try again.",
        author: "Error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // fetch a quote when the component first loads
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="App">
      <h1>Quote Generator</h1>
      <Quote text={quote.text} author={quote.author}></Quote>
      <button onClick={fetchQuote} disabled={isLoading} className="quote-button">
        {isLoading ? 'Loading...' : 'New Quote'}
      </button>
    </div>
  );
}

export default App;
