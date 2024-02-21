// Import AWS SDK if needed. You can also import other dependencies here.
import AWS from 'aws-sdk';

// Your Lambda handler
export const handler = async (event, context) => {
  // Your Lambda processing logic here
  // For example, logging the event and returning a simple message

  console.log('Event: ', event);

  // Return a response
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Your function executed successfully!',
      input: event,
    }),
  };
};
