import React, { FunctionComponent } from 'react';
import ReactModal from 'react-modal';

interface IModalCustomProps extends ReactModal.Props {
  title: string;
  askToClose: () => void;
  onChangeInput: () => void;
}

const Modal: FunctionComponent<IModalCustomProps> = (props) => {
  const {
    title,
    isOpen,
    askToClose,
    onAfterOpen,
    onRequestClose,
    onChangeInput
  } = props;

  return (
    <ReactModal
      contentLabel="modalA"
      closeTimeoutMS={150}
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}>
      <h1>{title}</h1>
      <button onClick={askToClose}>close</button>
      <div>I am a modal. Use the first input to change the modal's title.</div>
      <form>
        <input onChange={onChangeInput} />
      </form>
    </ReactModal>
  );
};

export default Modal;
