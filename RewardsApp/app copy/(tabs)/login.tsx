import StackedList from '@/components/StackedList';

export default function Login() {
    const items = [{name : "item 1"}, {name : "item 2"}, {name : "item 3"}, {name : "item 4"}]

    return (<StackedList items = {items}/>);
}