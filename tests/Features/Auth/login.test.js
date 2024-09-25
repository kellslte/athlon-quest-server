import request from "supertest";
import Utilities from "../../../src/lib/utils.js";
import UserService from "../../../src/app/services/user.service.js";

const app = Utilities.bootstrapTestEnvironment();

beforeEach(async () => {
  await UserService.deleteMany();
});

describe( "tests for the login endpoint", () =>
{ 
    it( "should return a 404 error if the user credentials(email) does not exist", async () =>
    { 
        const response = await request( app ).post( "/api/v1/auth/login" ).send( {
            email: "invalid@email.com",
            password: "password"
        } )
        
        expect( response.status ).toBe( 404 );
        expect( response.body.success ).toBe( false );
        expect( response.body.message ).toBe( "Invalid credentials, please check your input and try again" );
    } );

    it( "should return a 403 error if the user credentials(password) is incorrect", async () =>
    {
        await request(app).post("/api/v1/auth/register").send({
          email: "v3QGh@example.com",
          password: "password",
          confirm_password: "password",
          role: "admin",
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "1234567890",
          country: "USA",
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zipCode: "12345",
          primary: true,
          gender: "male",
        } );
        
        const response = await request(app).post("/api/v1/auth/login").send({
          email: "v3QGh@example.com",
          password: "seriously secure password",
        } );
        
        expect( response.status ).toBe( 403 );
        expect( response.body.success ).toBe( false );
        expect( response.body.message ).toBe( "Invalid credentials, please check your input and try again" );
    } );
    
    it( "should log the user in with the correct credentials", async () =>
    {
        await request(app).post("/api/v1/auth/register").send({
          email: "v3QGh@example.com",
          password: "password",
          confirm_password: "password",
          role: "admin",
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "1234567890",
          country: "USA",
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zipCode: "12345",
          primary: true,
          gender: "male",
        });

        const response = await request(app).post("/api/v1/auth/login").send({
          email: "v3QGh@example.com",
          password: "password",
        } );
        
        expect( response.status ).toBe( 200 );
        expect( response.body.success ).toBe( true );
        expect( response.body.message ).toBe( "User authenticated successfully" );
     } );
} );