import re
import abc
import io

class BusinessCardParser():
    """ Reads text on a business card. """

    def getContactInfo(self, document):
        """ Finds name, phone number, and email address in `document`.

        Args:
            document (str): string-value filepath to the document.

        Returns:
            ContactInfo: object containing contact information for the
                individual described in the business card.
        """
        return ContactInfo(document)


class ContactInfo():
    """ Parses out the requested contact info. """

    def __init__(self, document):

        # store the filepath
        self.document = document
        buf = io.StringIO(document)
        # read the document and store data
        self.lines = []
        for line in buf.readlines():
            fragments = line.split("\n")
            self.lines.append(fragments[0])
           
                

        # register contact info fragments and initialize
        self.fragments = [Name(), Phone(), Email()]

        # init default values
        self.parsed_data = {}
        for fragment in self.fragments:
            self.parsed_data[fragment.datatype] = None

        # if we couldn't read the file, return with default vals
        if not self.lines:
            return
        else:
            # loop through data and parse info
            for line in self.lines:
                for fragment in self.fragments:
                    #print(fragment)
                    if fragment.detect(line):
                        self.parsed_data[fragment.datatype] = fragment.parse(
                            line)
             
                    
                        

    def getName(self):
        """ Returns the full name of an individual(e.g. John Smith, Susan Malick)."""

        if not 'name' in self.parsed_data:
            return None
        else:
            return self.parsed_data['name']

    def getPhoneNumber(self):
        """ Returns the phone number formatted as a sequence of digits."""

        if not 'phone' in self.parsed_data:
            return None
        else:
            return self.parsed_data['phone']

    def getEmailAddress(self):
        """ Returns the email address."""

        if not 'email' in self.parsed_data:
            return None
        else:
            return self.parsed_data['email']


class ContactFragment(abc.ABC):
    """ Defines an abstract base class for pieces of information in a business
        card.
    """

    def __init__(self):
        self.datatype = ''
        self.data = None

    def detect(self, line):
        """ Detects whether line contains a fragment of this type.

        Args:
            line (str): string to test.

        Returns:
            bool: True if this data type is detected in `line`, False otherwise.
        """
        pass

    def parse(self, line):
        """ Parses the line and puts it into the format specified in this
            function. Assumes self.detect has returned true.

        Args:
            line (str): string to format.

        Returns:
            str: data in the correct format
        """
        pass


class Name(ContactFragment):
    """ An individual's first, middle (if present), and last name."""

    def __init__(self):
        self.datatype = 'name'
        self.data = None
        # define the regex pattern to test
        self.pattern = "^(\w+)\s+(\w+\.?)(\s+\w+)?$"
        self.match = None
        self.data = None
        self.common_names = set()

        # load a list of common English names for additional heuristics
        with open('names.txt', 'r') as fid:
            lines = fid.readlines()
            for line in lines:
                fragments = line.split('\n')
                self.common_names.add(fragments[0])

    def detect(self, line):
        """ Detects whether `line` contains a name as defined by self.pattern.

        Args:
            line (str): string to test.

        Returns:
            bool: True if a name is in `line`, False otherwise.
        """
        # delete leading and trailing whitespace
        line.strip()
        if ',' in line:
            line = line.split(',')[0]
        
        if ' ' in line:
            line = line.split(maxsplit=1)
            first_name = line[0]
            first_letter = first_name[0].upper()
            first_name = first_name[1:].lower()  
            first_name = first_letter + first_name        
            line = first_name + " " + line[1]

        # store a match if it exists, else store None
        self.match = re.match(self.pattern, line)

        # check for a match
        if self.match:
            # check if the first name is a common name
            
            if not self.match.group(1) in self.common_names:
                self.match = None

        return self.match

    def parse(self, line):
        """ Parses the line and puts it into the format specified in this
        function. Assumes self.detect has returned true.

        Args:
            line (str): string to format.

        Returns:
            str: data in the correct format
        """
        # check for an existing match
        if not self.match:
            raise ValueError("""Cannot parse {0}! The requested data was not
                             found in this line.""".format(self.datatype))
        else:
            # first see if we have a FirstName LastName match
            first_name = self.match.group(1)
            #first_letter = first_name[0].upper()
            #first_name = first_name[1:].lower()  
            #first_name = first_letter + first_name
            if self.match.group(3) == None:
                last_name = self.match.group(2)
                middle_name = None
            else:
                # else we have a FirstName MiddleName LastName Match
                middle_name = self.match.group(2)
                last_name = self.match.group(3).strip()

            # compile the names
            if middle_name:
                self.data = "{0} {1} {2}".format(
                    first_name, middle_name, last_name)
            else:
                self.data = "{0} {1}".format(first_name, last_name)
            
            return self.data


class Email(ContactFragment):
    """ An individual's email address."""

    def __init__(self):
        self.datatype = 'email'
        self.data = None
        # the regex pattern to test
        self.pattern = "^(?P<prefix>\w+\.?\w+)@(?P<domain>\w+.*)"#\.(?P<suffix>\w+)$"
        self.match = None
        self.data = None

    def detect(self, line):
        """ Detects whether `line` contains an email as defined by self.pattern.

        Args:
            line (str): string to test.

        Returns:
            bool: True if an email is in `line`, False otherwise.
        """
        # delete leading and trailing whitespace
        line.strip()
        lines = line.split(' ')
        #line = [line for line in lines if '@' in line and '.' in line][0]
        for line1 in lines:
            if '@' in line1 and '.' in line1:
                line = line1
                break
            else:
                line = 'Empty'
        
        #if '@' in line:
            #addr = [t for t in line.split(' ') if '@' in t and '.' in t ][0] 
        #else:
           # addr = None
        #print("--------------------------------From buss",addr)
        #field_map["email"] = addr if self._email_expr.match(addr) else None
        # store a match if it exists, else store None
        self.match = re.match(self.pattern, line)

        return self.match

    def parse(self, line):
        """ Parses the line and puts it into the format specified in this
        function. Assumes self.detect has returned true.

        Args:
            line (str): string to format.

        Returns:
            str: data in the correct format
        """
        # check for an existing match
        if not self.match:
            raise ValueError("""Cannot parse {0}! The requested data was not
                             found in this line.""".format(datatype))
        else:
            # if we have a match, unpack data for formatting
            prefix = self.match.group('prefix')
            domain = self.match.group('domain')
            #suffix = self.match.group('suffix')

            # compile the email address
            self.data = "{0}@{1}".format(prefix, domain)

            return self.data


class Phone(ContactFragment):
    """ An individual's phone number."""

    def __init__(self):
        self.datatype = 'phone'
        self.data = None
        # the regex pattern to test
        self.pattern = "^(\w*:?\s)?(?P<country_code>\+?\d{1,3})?\s*\(?(?P<area_code>\d{3})\)?\s*-?(?P<prefix>\d{3})-?(?P<suffix>\d{4})$"
        self.match = None
        self.data = None

    def detect(self, line):

        """ Detects whether `line` contains a phone number as defined by self.pattern.

        Args:
            line (str): string to test.

        Returns:
            bool: True if a name is in `line`, False otherwise.
        """
        # delete leading and trailing whitespace
        line.strip()
        
        fst_num = 0
        for digit in line:
            if digit.isdigit():
                fst_num = digit;
                break;
                
        if ((fst_num == '0' and sum(c.isdigit() for c in line) >= 11)or(fst_num == '2' and sum(c.isdigit() for c in line) >= 12))and ("fax" or "whats") not in line.lower():
            line = ''.join((c for c in line if c.isdigit() or c == '+'))
        else: 
            line = 'Empty'
            #print(line)
        
        #print("--------------------",line.lower())
        # only store a new match
        if not self.match:
            # store a match if it exists, else store None
            self.match = re.match(self.pattern, line)
        #print(self.match)
        return self.match

    def parse(self, line):
        """ Parses the line and puts it into the format specified in this
        function. Assumes self.detect has returned true.

        Args:
            line (str): string to format.

        Returns:
            str: data in the correct format
           
        """
        #print("in parse function")
        # check for an existing match
        if not self.match:
            raise ValueError("""Cannot parse {0}! The requested data was not
                             found in this line.""".format(self.datatype))
        else:
             #if we have a match, unpack data for formatting
            try:
                country_code = self.match.group('country_code')
                if not country_code:
                    country_code = ''
                else:
                    country_code = country_code.replace('+', '+')
            except:
                country_code = ''
            area_code = self.match.group('area_code')
            prefix = self.match.group('prefix')
            suffix = self.match.group('suffix')

            # compile the email address
            self.data = "{0}{1}{2}{3}".format(
                country_code, area_code, prefix, suffix)

                                                                                 

            return self.data
