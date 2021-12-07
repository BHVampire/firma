import { Fragment } from 'react'
import Button from '../Button/Button'
import { AnimatePresence, motion } from "framer-motion"
import './Modal.scss'

const Modal = ({ children, isOpen, setIsOpen, width, height }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <Fragment>
                    <motion.div
                        className="modal-wrapper"
                        style={{ zIndex: '1000' }}
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(7px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        transition={{ type: "tween", duration: 0.5 }}
                        onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            e.nativeEvent.stopImmediatePropagation()

                            setIsOpen(false)
                        }}
                    />

                    <motion.div
                        className="modal"
                        style={{ zIndex: '1000', width, height }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "tween", duration: 0.5 }}
                    >
                        <div className="close">
                            <Button round={true} icon="clear" waves="brown" size={3} onClick={() => setIsOpen(false)} />
                        </div>

                        <div className="modal-content">
                            {children}
                        </div>
                    </motion.div>
                </Fragment>
            )
            }
        </AnimatePresence >
    )
}

export default Modal
