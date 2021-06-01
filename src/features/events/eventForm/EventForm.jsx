/* global google */
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, Confirm, Header, Segment } from 'semantic-ui-react';
import { listenToEvents } from '../eventActions';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../app/api/categoryOptions';
import MyDdateInput from '../../../app/common/form/MyDateInput';
import MyPlaceInput from '../../../app/common/form/MyPlaceInput';
import {
  addEventToFirestore,
  cancelEventToggle,
  listenToEventFromFirestore,
  updateEventInFirestore,
} from '../../../app/firestore/firestoreService';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { toast } from 'react-toastify';
// import { roundToNearestMinutes } from 'date-fns';

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );
  const { loading, error } = useSelector((state) => state.async);

  const initialValues = selectedEvent ?? {
    dest: '',
    brMes: '',
    date: '',
    venue: {
      address: '',
      latLng: null,
    },
    city: {
      address: '',
      latLng: null,
    },
  };

  const validationSchema = Yup.object({
    dest: Yup.string().required('Мора да внесете дестинација'),
    brMes: Yup.string().required('Мора да внесете број на места'),
    date: Yup.string().required('Мора да внесете датум и врем на поаѓање'),
    city: Yup.object().shape({
      address: Yup.string().required('Мора да внесете град'),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required('Мора да внесете adresa'),
    }),
    description: Yup.string().required('Мора да внесете опис на патувањето'),
  });
  
  async function handleCancleToggle(event) {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
      setLoadingCancel(false)
    } catch (error) {
      setLoadingCancel(true);
      toast.error(error.message);
    }
  }

  useFirestoreDoc({
    shouldExecute: !!match.params.id, 
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  });

  if (loading)
    return <LoadingComponent content='Настанот се вчитува...' />;

  if (error) return <Redirect to='/error' />;

  return (
    <Segment clearing>
      <Header
        content={selectedEvent ? 'Измени ја понудата' : 'Понуди релација'}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values);
            history.push('/events');
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className='ui form'>
            <MySelectInput
              name='dest'
              placeholder='Избери дестинација'
              options={categoryData}
            />
            <MyTextInput
              name='brMes'
              placeholder='Внеси број на понудени места'
              type='number'
              min='0'
              max='8'
            />
            <MyDdateInput
              name='date'
              placeholderText='Внеси датум и врем'
              timeFormat='HH:mm'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy H:mm '
            />
            <MyPlaceInput
              name='city'
              placeholder='Внеси град од кој се поаѓа'
            />
            <MyPlaceInput
              name='venue'
              disabled={!values.city.latLng}
              placeholder='Внеси адреса на поаѓање'
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                types: ['address'],
              }}
            />
            <MyTextArea
              name='description'
              placeholder='Опис на патувањето'
              rows={3}
            />
            {selectedEvent &&
              <Button
              loading={loadingCancel}
              type='button'
              floated='left'
              color={selectedEvent.isCancelled ? 'green' : 'red'}
              content={selectedEvent.isCancelled ?  'Reactivate event' : 'Cancel Event' }
              onClick={() => setConfirmOpen(true)}
            />}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              floated='right'
              positive
              content='Потврди'
            />
            <Button
              disabled={isSubmitting}
              as={Link}
              to='/events'
              type='submit'
              floated='right'
              content='Избриши'
            />
          </Form>
        )}
      </Formik>
      <Confirm 
      content={selectedEvent?.isCancelled ? 'Ова ќе се реактивира! Дали навистина сакаш?' : 'Ова ќе го оневозможи настанот! Дали си сигурен во тоа?'}
      open={confirmOpen}
      onCancel={() => setConfirmOpen(false)}
      onConfirm={() => handleCancleToggle(selectedEvent)}
      />
    </Segment>
  );
}