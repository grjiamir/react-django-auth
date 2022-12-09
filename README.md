# React Authorization role-based and Django oAuth toolkit

## Usage

1. Copy auth folder from `./src/auth` to your project.
2. Add `AuthProvider` and `Router` to index.js

```jsx
import { AuthProvider } from "./auth/contexts/AuthContext";
```

```jsx
<BrowserRouter>
  <AuthProvider>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </AuthProvider>
</BrowserRouter>
```

3. Edit the default values in the `auth/env.js`

```jsx
import axios from "axios";

// localStorage key - default = user
export const LOCAL_STORAGE_KEY = "user";

// axios
export const AXIOS = axios;

// login url django oAuth2
export const LOGIN_URL = "";

// Get user information from django api
export const GET_USER_INFO_URL = "";

// client_id and client_secret oAth2 application
export const CLIENT_ID = "";
export const CLIENT_SECRET = "";
```

### React Protected Routes. `RequireAuth`

```jsx
import RequireAuth from "./auth/components/RequireAuth";
```

```jsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route path="login" element={<Login />} />

    <Route element={<RequireAuth />}>
      <Route path="/" element={<Home />} />
    </Route>

    <Route element={<RequireAuth permissins={["add_group", "view_group"]} />}>
      <Route path="private" element={<Private />} />
    </Route>

    <Route path="unauthorized" element={<Unauthorized />} />
  </Route>
</Routes>
```

### Use of user information in components.

```jsx
import { useAuthContext } from "../auth/hooks/useAuthContext";
```

```jsx
const { user } = useAuthContext();
```

| Property        | Description                                                                | Type      | Default |
| --------------- | -------------------------------------------------------------------------- | --------- | ------- |
| isAuthenticated | This value is true if the user is logged in                                | `boolean` | false   |
| token           | A token received from Django that you can send to the server for requests. | `string`  | null    |
| info            | User information such as first name, last name, email and etc              | `object`  | {}      |

#### Example:

```jsx
import { useAuthContext } from "../auth/hooks/useAuthContext";

function Home() {
  const { user } = useAuthContext();

  return (
    <div>
      <h1>Home</h1>
      <p>{user?.isAutenticated && user.info.phone}</p>
    </div>
  );
}

export default Home;
```

## User Login

```jsx
import { useLogin } from "../auth/hooks/useLogin";
```

```jsx
const { login, isLoading, error } = useLogin();
```

```jsx
login("username", "password");
```

# Django API example

## Serializers

```python
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'phone']


class UserPermissionsSerializer(serializers.ModelSerializer):
    user_permissions = serializers.SerializerMethodField("get_user_permissions")

    class Meta:
        model = User
        fields = ['user_permissions']

    def get_user_permissions(self, obj):
        if obj.is_superuser:
            return "__all__"
        if not obj.user_permissions.all().count() > 0:
            return None
        perms_list = []
        for p in obj.user_permissions.all():
            perms_list.append(p.codename)
        return perms_list
```

## APIView

```python
class GetUserInformation(APIView):

    def get(self, request):
        if request.user:
            serializer = UserSerializer(instance=request.user)
            perm_serializer = UserPermissionsSerializer(instance=request.user)
            data = {
                'info': serializer.data,
                'user_permissions': perm_serializer.data['user_permissions']
            }
            return Response(data)
        return Response({'message': 'User not found!'}, status=400)
```

# Tasks

- [ ] Add django group permissions
- [ ] Handle request errors
- [ ] Add Signup
- [ ] Create dependency
