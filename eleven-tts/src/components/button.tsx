export const Button = ({ type, children, ...props }: React.ComponentProps<"button">) => {
    return <button type={type} {...props}>{children}</button>
}