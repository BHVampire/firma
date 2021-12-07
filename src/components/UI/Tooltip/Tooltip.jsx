import { usePopperTooltip } from 'react-popper-tooltip'
import MarkdownView from 'react-showdown'
import Icon from '../Icon/Icon'
import '../Button/Button.scss'
import './Tooltip.scss'

const Tooltip = ({
    text = 'Tooltip',
    inline = false,
    waves = true,
    placement = 'left',
    style
}) => {

    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({
        placement,
        // visible: true,
        // trigger: 'click'
    })

    return (
        <div className="tooltip" >
            <button
                tabIndex="-1"
                className={`round ${waves ? 'waves-effect waves-dark' : ''} ${inline ? 'inline' : ''}`}
                style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    ...style
                }}
                ref={setTriggerRef}
            >
                <Icon icon="help_outline" size={1.5} color="rgba(236, 0, 0, 0.25)" />
            </button>

            {visible && (
                <div
                    ref={setTooltipRef}
                    {...getTooltipProps({ className: 'tooltip-container' })}
                >
                    <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                    <MarkdownView markdown={text} />
                </div>
            )}
        </div>
    )
}

export default Tooltip
