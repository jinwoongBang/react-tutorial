### react router

## history

## location

## match
```xml
- 파라미터를 전달 해줄 때
<Route path="/about/:name" component={About}/>
```

```javascript
- 파라미터를 전달 받을 때
const About = ({match}) => {
    return (
        <div>
            <h2>About {match.params.name}</h2>
        </div>
    );
};```