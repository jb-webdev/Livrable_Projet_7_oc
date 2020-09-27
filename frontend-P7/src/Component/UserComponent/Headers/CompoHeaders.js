/**
 * @author j.boero
 * 
 * Composant qui affiche les donnees utilisateur dans le header
 * 
 */
import React from 'react'

export function CompoUsername({label}) {
    return (
        <div>
            <h4 className="mb-0 1h-100" name="username">{label}</h4>
        </div>
    )
}

export function CompoBIo({label}) {
    return (
        <div>
            <h6 className="mb-0 1h-100" name="bio">{label}</h6>
        </div>
    )
}