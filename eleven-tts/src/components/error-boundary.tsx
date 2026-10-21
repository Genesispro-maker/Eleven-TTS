import React, { type ReactNode } from "react";

interface StateType {
    hasError: boolean
}

interface Props {
    children: ReactNode,
    fallback: ReactNode,
}

export class ErrorBoundary extends React.Component<Props, StateType> {
    constructor(props: Props){
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(){
        return {
            hasError: true
        }
    }

    componentDidCatch(error: Error, info: React.ErrorInfo): void {
        console.error(error)
        console.error(info.componentStack)
    }

    render(): React.ReactNode {
        if(this.state.hasError){
            return this.props.fallback || null
        }

        return this.props.children
    }
}