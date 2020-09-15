import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ThemeProvider } from 'styled-components';

import theme from './config/theme';
import Layout from './components/layout';

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
