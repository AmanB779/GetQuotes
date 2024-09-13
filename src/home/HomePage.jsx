import * as React from "react";
import { useState, useEffect } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  Alert,
  Box,
  Divider,
} from "@mui/material";
import "./HomePage.css";

export default function HomePage() {
  const API_URL = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
  const [newQuote, setQuote] = useState({});
  const [error, setError] = useState(false);
  const [savedQuotes, setSavedQuotes] = useState([]);

  useEffect(() => {
    async function fetchFirstQuote() {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        setQuote({ quote: result[0] });
      } catch (err) {
        setError(true);
      }
    }
    fetchFirstQuote();
  }, []);

  const getNewQuote = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      setQuote({ quote: result[0] });
    } catch (err) {
      setError(true);
    }
  };

  const handleAlertClose = () => {
    setError(false);
  };

  const saveQuote = () => {
    if (
      newQuote.quote &&
      !savedQuotes.some((quote) => quote === newQuote.quote)
    ) {
      setSavedQuotes([...savedQuotes, newQuote.quote]);
    }
  };

  const unsaveQuote = (quoteToRemove) => {
    setSavedQuotes(savedQuotes.filter((quote) => quote !== quoteToRemove));
  };

  return (
    <div className="QuoteBox">
      {error && (
        <Box mb={2}>
          <Alert severity="error" onClose={handleAlertClose}>
            Error in connecting to database!
          </Alert>
        </Box>
      )}

      <Box className="QuoteBoxMain">
        <Card className="CardContentWrapper">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Quotes of the Day
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {newQuote.quote}
            </Typography>
          </CardContent>
          <CardActions>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              p={1}
            >
              <Button
                type="button"
                variant="contained"
                onClick={getNewQuote}
                endIcon={<YoutubeSearchedForIcon />}
              >
                Get New Quote
              </Button>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={saveQuote}
                endIcon={<BookmarkIcon />}
              >
                Save
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Box>

      <Box className="SavedQuotesSection">
        <Typography variant="h5" gutterBottom>
          Saved Quotes
        </Typography>
        <Divider style={{ margin: "1rem auto", border: "1px solid grey" }} />
        {savedQuotes.length > 0 ? (
          savedQuotes.map((quote, index) => (
            <Card key={index} sx={{ maxWidth: 400, mx: "auto", mb: 2 }}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {quote}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => unsaveQuote(quote)}
                  endIcon={<BookmarkRemoveIcon />}
                  style={{ margin: "-0.5rem auto 0.5rem" }}
                >
                  Unsave
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No saved quotes yet.
          </Typography>
        )}
      </Box>
    </div>
  );
}
