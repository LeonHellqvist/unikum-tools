import React from 'react';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import EventNoteIcon from '@mui/icons-material/EventNote';
import './Popup.css';
import '@fontsource/roboto/400.css';

import CreateButton from './CreateButton';
import Schedule from './schedule/Schedule';
import Food from './food/Food';

const Popup = () => {
  const [page, setPage] = React.useState(0);

  const openOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  if (page === 0) {
    return (
      <div className="App">
        <header className="App-header">
          <Stack spacing={0} direction="row">
            <nav aria-label="main mailbox folders">
              <List>
                <ListItem disablePadding onClick={() => setPage(1)}>
                  <ListItemButton>
                    <ListItemIcon>
                      <BookmarksIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Bokmärk" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => openOptions()}>
                    <ListItemIcon>
                      <SettingsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Alternativ" />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
            <nav aria-label="main mailbox folders">
              <List>
                <ListItem disablePadding onClick={() => setPage(2)}>
                  <ListItemButton>
                    <ListItemIcon>
                      <EventNoteIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Schema" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => setPage(3)}>
                  <ListItemButton>
                    <ListItemIcon>
                      <LocalDiningIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Matsedel" />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </Stack>
        </header>
      </div>
    );
  }

  if (page === 1) {
    return <CreateButton setPage={setPage}></CreateButton>;
  }

  if (page === 2) {
    return <Schedule setPage={setPage}></Schedule>;
  }

  if (page === 3) {
    return <Food setPage={setPage}></Food>;
  }

  return <></>;
};

export default Popup;
