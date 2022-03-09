import { useNavigate, useLocation } from 'react-router-dom';
export default function withMyHook(Component) {
    return function WrappedComponent(props) {
      const navigation = useNavigate();
      const location = useLocation();
      return <Component {...props} navigate={navigation} location={location} />;
    }
}