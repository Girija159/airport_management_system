import styles from './Button.module.css';

const Button = props => {
    const onClick = () => {
        if(props.onClick) props.onClick(props.id);
    };

    return (
        <div className={styles["button-wrapper"]}>
            <button className={styles.button} 
                    type={props.type} 
                    id={props.id}
                    onClick={onClick}>
                {props.children}
            </button>
        </div>
    );
  };
  
  export default Button;