import style from './FormLayout.module.css';

const FormContainer = (props) => {
  return (
    <div className={style.container}>
      {props.children}
    </div>
  );
};

const FormContent = (props) => {
  return (
    <div className={style.content}>
      {props.children}
    </div>
  )
}

const FormAction = (props) => {
  return (
    <div className={style.content_actions}>
      {props.children}
    </div>
  )
}

const FormInfo = (props) => {
  return (
    <div className={style.content_info}>
      {props.children}
    </div>
  )
}

const FormInfoFull = (props) => {
  return (
    <div className={style.content_info_full}>
      {props.children}
    </div>
  )
}

const FormTitle = (props) => {
  return (
    <div className={style.content_title}>
      {props.children}
    </div>
  )
}

export { FormContainer, FormContent, FormAction, FormInfo, FormInfoFull, FormTitle };
