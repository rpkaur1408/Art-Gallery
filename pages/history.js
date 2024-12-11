import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { searchHistoryAtom } from '@/store';
import { Card, ListGroup, Button } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import { getHistory, removeFromHistory } from '@/lib/userData'; // Import helper functions

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  // Load history from the database on component mount
  useEffect(() => {
    const fetchHistory = async () => {
      const historyData = await getHistory();
      setSearchHistory(historyData); // Set the fetched history to the atom
    };
    fetchHistory();
  }, [setSearchHistory]);

  // Parse the searchHistory
  let parsedHistory = [];
  searchHistory?.forEach?.((h) => {
    try {
      let params = new URLSearchParams(h);
      parsedHistory.push(Object.fromEntries(params.entries()));
    } catch (error) {
      console.error('Error parsing history item:', h, error);
    }
  });

  // Navigate to the selected history
  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  };

  // Remove an item from the history
  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation(); // Prevent triggering the parent click event
    const updatedHistory = await removeFromHistory(searchHistory[index]); // Remove from the database
    setSearchHistory(updatedHistory); // Update the atom with the new history
  };

  return (
    <div>
      {parsedHistory.length === 0 ? (
        <Card>
          <Card.Body>Nothing here, try searching for some artwork.</Card.Body>
        </Card>
      ) : (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              className={styles.historyListItem}
              onClick={(e) => historyClicked(e, index)}
            >
              {Object.keys(historyItem).map((key) => (
                <span key={key}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
