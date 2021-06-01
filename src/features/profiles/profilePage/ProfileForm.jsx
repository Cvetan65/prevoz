import { Form, Formik } from 'formik';
import React from 'react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { updateUserProfile } from '../../../app/firestore/firestoreService';

export default function ({ profile }) {
  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description || '',
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
      onSubmit={async (values, {setSubmitting}) => {
      try{
        await updateUserProfile(values)
      } catch (error) {
        toast.error(error.message);
      }finally {
        setSubmitting(false)
      }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className='ui form'>
          <MyTextInput name='displayName' placeholder='Име за приказ' />
          <MyTextArea name='description' placeholder='Опис' />
          <Button
          loading={isSubmitting}
          displayName={isSubmitting || !isValid || !dirty}
          floated='right'
            type='submit'
            size='large'
            positive
            content='Ажурирај го профилот'
          />
        </Form>
      )}
    </Formik>
  );
}
