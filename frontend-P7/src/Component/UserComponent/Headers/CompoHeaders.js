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
            <h4 className="mb-0 1h-100" name="userMessage">{label}</h4>
        </div>
    )
}

export function CompoInscription({label}) {
    return (
        <div>
            <h6>Membre depuis le {label}</h6>
        </div>
    )
}