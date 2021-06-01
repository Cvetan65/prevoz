import React from 'react';
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Link } from 'react-router-dom';
import {format} from 'date-fns';
import { deleteEventInFirestore } from '../../../app/firestore/firestoreService';

export default function EventListItem({ event}) {

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src={event.hostPhotoURL || '/assets/user.png'} />
            <Item.Content>
              <Item.Header content={event.dest} />
              <Item.Description>Предложено од {event.hostedBy}</Item.Description>
              {event.isCancelled && (
                <Label 
                  style={{top: '-1px'}}
                  ribbon='right'
                  color='red'
                  content='Овој предлог е откажан'
                />
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> {format(event.date, 'MMMM d, yyyy H:mm ')}
          <Icon name='marker' /> {event.venue.address}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee) => (
            <EventListAttendee key={attendee.id} attendee={attendee} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <div>{event.description}</div>
        <Button
          onClick={() => deleteEventInFirestore(event.id)}
          color='red'
          floated='right'
          content='Избриши'
        />
        <Button
          as={Link} to={`/events/${event.id}`}
          color='teal'
          floated='right'
          content='Види повеќе'
        />
      </Segment>
    </Segment.Group>
  );
}
