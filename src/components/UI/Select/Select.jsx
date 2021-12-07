import './Select.scss'
import { Fragment, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import useOnclickOutside from "react-cool-onclickoutside"
import Tooltip from '../Tooltip/Tooltip'


const Select = ({ options,
    centeredLabel = true,
    label = 'Label',
    value = '',
    setValue,
    useKey = false,
    hidden,
    tooltip,
    ...rest
}) => {
    const [input, setInput] = useState(options[value])
    const [checked, setChecked] = useState('')

    const [openMenu, setOpenMenu] = useState(false)

    useEffect(() => {
        if (value) {
            useKey ? setInput(options[value]) : setInput(value)
        } else {
            setInput(value)
        }
    }, [value])

    const ref = useOnclickOutside(() => {
        setOpenMenu(false)
        setChecked(false)
    })

    return (
        <div className="custom-select-wrapper" hidden={hidden}>
            <div className="custom-select" onClick={() => {
                setChecked(true)
                setOpenMenu(true)
            }}>
                {
                    tooltip
                        ? <Tooltip
                            placement="auto"
                            text={tooltip}
                            style={{ top: '-25%' }}
                        />
                        : ''
                }

                <input {...rest}
                    disabled
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onFocus={() => setChecked(true)}
                    onBlur={() => {
                        setChecked(false)
                        if (input === '') {
                            setValue(0)
                            setInput('')
                        } else {
                            setInput(options[value] || '')
                        }
                    }}
                />

                <label className={`${openMenu || value.length > 0 ? 'active' : ''} ${centeredLabel ? 'centeredLabel' : ''}`}>{label}</label>

                <span className="material-icons-outlined icon">
                    {
                        checked > 0
                            ? 'expand_less'
                            : 'expand_more'
                    }
                </span>

            </div>


            {
                checked > 0
                    ?
                    <div ref={ref} className="drop-down">
                        {
                            Object.keys(options).length > 0
                                ?
                                <Fragment>
                                    {
                                        Object.keys(options).map(e => (
                                            <li
                                                key={uuid()}
                                                onMouseDown={() => {
                                                    setInput(options[e])
                                                    setValue(e)
                                                }}
                                            >
                                                {options[e]}
                                            </li>
                                        ))
                                    }
                                </Fragment>
                                :
                                <div>Sin resultados...</div>
                        }
                    </div>
                    :
                    ''
            }

        </div>
    )
}

export default Select
