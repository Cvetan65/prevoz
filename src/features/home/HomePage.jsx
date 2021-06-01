import React from 'react'
import { Button, Container, Header, Icon, Image, Segment } from 'semantic-ui-react'

export default function HomePage({history}) {
    return (
      <Segment inverted textAlign='center' vertical className='masthead'>
          <div className='div'>
          <Container className='concen'>
              <Header as='h1' inverted>
                  <Image seize='masive' src='/assets/logo01.png' style={{marginBottom: 12}} />
                  т`ка бaше...
              </Header>
              <Button onClick={() => history.push('/events')} size='huge' inverted>
                Направи понуда
                <Icon name='right arrow' inverted/>
              </Button>
          </Container>
          </div>
      </Segment>
    )
}
