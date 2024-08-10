const Notification = ({ message, colour }) => {
  if (message === null) return null;

  return <div className={colour}>{message}</div>;
};

export default Notification;
