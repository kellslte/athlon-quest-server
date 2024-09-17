export class ValidationError extends Error {
  constructor(message, errors) {
    super(message);
    this.statuscode = 422;
    this.errors = errors;
  }
}

export class TooManyRequestsError extends Error
{
    constructor( message )
    { 
        super( message );
        this.statuscode = 429;
    }
}

export class UnauthorizedError extends Error
{
    constructor( message )
    { 
        super( message );
        this.statuscode = 403;
    }
}

export class UnauthenticatedError extends Error
{
    constructor( message )
    { 
        super( message );
        this.statuscode = 401;
    }
}

export class ConflictError extends Error
{
    constructor( message )
    {
        super( message );
        this.statuscode = 409;
    }
}

export class NotFoundError extends Error
{
    constructor( message )
    {
        super( message );
        this.statuscode = 404;
    }
}

export class BadRequestError extends Error
{
    constructor( message )
    {
        super( message );
        this.statuscode = 400;
    }
}

export class ServerError extends Error
{
    constructor( message )
    {
        super( message );
        this.statuscode = 500;
    }
}
