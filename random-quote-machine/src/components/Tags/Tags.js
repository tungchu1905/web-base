import React, { Component } from "react";
import clsx from "clsx";
import './Tag.css'
const tags = [
    'It',
    'business',
    'education',
    'worker',
    'java'
]
class Tags extends Component {

    //activeTags={'bussiness':0}
    handleChangeTag = (tagName) => {
        this.props.handleChangeTag(tagName)
    }

    render() {
        const { activeTags } = this.props
        return (
            <div className="Tags">
                {tags.map((tagName) => {
                    const cls = clsx('Tags-box', { active: activeTags.includes(tagName) })
                    return (
                        <span className={cls}
                            onClick={() => this.handleChangeTag(tagName)}

                        >{tagName}</span>
                    )
                }
                )}
            </div>
        )
    }
}
export default Tags