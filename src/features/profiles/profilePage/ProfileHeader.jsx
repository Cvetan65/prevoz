import React from 'react'
import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from 'semantic-ui-react'

export default function ProfileHeader({profile, isCurrentUser}) {
    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={profile.photoURL || '/assets/user.png'} />
                            <Header as='h1' style={{display: 'block', marginBottom: 10}} content={profile.displayName}/>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4} >
                    <Statistic label='Следбеници' value={10} />
                    <Statistic label='Следи' value={5} />
                    {!isCurrentUser &&
                    <>
                    <Divider/>
                    <Reveal animated='move' >
                        <Reveal.Content visible style={{width: '100%'}} >
                            <Button fluid color='teal' content='Следи' />
                        </Reveal.Content> 
                        <Reveal.Content hidden style={{width: '100%'}} >
                            <Button fluid color='red' content='Не следи' />
                        </Reveal.Content>
                    </Reveal>
                    </>}
                </Grid.Column>
            </Grid>
        </Segment>
    )
}
