import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About } from '../pages';
import MenuContainer from '../container/MenuContainer';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';

const AppContainer = styled(Container)`
    box-sizing: border-box;
    margin: 0;
    padding: 0;
`

class App extends Component {
  render() {
    return (
      <AppContainer className="border">
        <MenuContainer />
        <Route exact path="/" component={Home} />
        <Switch>
          <Route path={['/about/:name', '/about']} component={About} />
        </Switch>
      </AppContainer>
    );
  }
}

export default App;
