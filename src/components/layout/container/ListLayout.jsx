import style from './ListLayout.module.css'

const ListLayout = (props) => {
  return (
    <div className={style.list_layout}>
      {props.children}
    </div>
  )
}

export default ListLayout;

