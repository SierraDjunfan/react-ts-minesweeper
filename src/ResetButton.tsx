import React from 'react'
import { ResetButtonProps } from './Interfaces';
import './ResetButton.scss'

export const ResetButton = (props: ResetButtonProps) =>
    <button id="reset-button" className={props.style} onClick={props.manageClick}></button>
